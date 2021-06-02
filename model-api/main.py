"""
    importing required libraries
"""
import numpy as np
from PIL import Image
import tensorflow as tf
import os
import sys
import time

import json
import pyrebase
import requests
import pandas as pd
from joblib import load
from datetime import datetime as dt

# ignore gpu
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

"""
    Function
"""
def timeDifInSec(stringStart, stringEnd):
    tstart = dt.strptime(stringStart, "%H:%M:%S:%f")
    tend = dt.strptime(stringEnd, "%H:%M:%S:%f")
    tdif = tend - tstart
    # print(tdif, type(tdif))

    sec = tdif.seconds
    msec = tdif.microseconds
    return(sec + (msec*0.000001))


def toPos(h, v):
    if h == 1:
        if v == 1:
            return 1
        elif v == 2:
            return 2
        elif v == 3:
            return 3
    elif h == 2:
        if v == 1:
            return 4
        elif v == 2:
            return 5
        elif v == 3:
            return 6
    elif h == 3:
        if v == 1:
            return 7
        elif v == 2:
            return 8
        elif v == 3:
            return 9


def load_image_into_numpy_array(path):
    return np.array(Image.open(path))


"""
    Load all model
"""

def load_all_model():
    sys.path.append("..")

    global CWD_PATH, hdetect_fn, pdetect_fn, tdetect_fn
    CWD_PATH = os.getcwd()

    hFOL = 'train_app_house'
    hMODEL_NAME = 'house_model'
    PATH_TO_MODEL_DIR = os.path.join(CWD_PATH,hFOL,'exported-models',hMODEL_NAME)
    PATH_TO_SAVED_MODEL = os.path.join(PATH_TO_MODEL_DIR,"saved_model")
    print('Loading house model...', end='')
    start_time = time.time()
    hdetect_fn = tf.saved_model.load(PATH_TO_SAVED_MODEL)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print('Done! Took {} seconds'.format(elapsed_time))

    pFOL = 'train_app_person'
    pMODEL_NAME = 'person_model'
    PATH_TO_MODEL_DIR = os.path.join(CWD_PATH,pFOL,'exported-models',pMODEL_NAME)
    PATH_TO_SAVED_MODEL = os.path.join(PATH_TO_MODEL_DIR,"saved_model")
    print('Loading person model...', end='')
    start_time = time.time()
    pdetect_fn = tf.saved_model.load(PATH_TO_SAVED_MODEL)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print('Done! Took {} seconds'.format(elapsed_time))

    tFOL = 'train_app_tree'
    tMODEL_NAME = 'tree_model'
    PATH_TO_MODEL_DIR = os.path.join(CWD_PATH,tFOL,'exported-models',tMODEL_NAME)
    PATH_TO_SAVED_MODEL = os.path.join(PATH_TO_MODEL_DIR,"saved_model")
    print('Loading tree model...', end='')
    start_time = time.time()
    tdetect_fn = tf.saved_model.load(PATH_TO_SAVED_MODEL)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print('Done! Took {} seconds'.format(elapsed_time))

def predict(parsedData):

    """
        fetch all data
    """
    dataList = []
    imFolList = ['house', 'oppositesex', 'person', 'tree']
    i = 1

    # key = '20210325_005731_joj3nf7jb' # change data key here
    # for key in jsons.keys():

    data = {}

    for fol in imFolList:

        if fol == 'house':
            dictHead = {
                'time': 'h_time',
                'strokes': 'h_strokes',
                'width': 'h_width',
                'height': 'h_height',
                'position': 'h_position'
            }
            imname = 'house_test.png'
            FOL = 'train_app_house'
            detect_fn = hdetect_fn
        elif fol == 'oppositesex':
            dictHead = {
                'time': 'p1_time',
                'strokes': 'p1_strokes',
                'width': 'p1_width',
                'height': 'p1_height',
                'position': 'p1_position'
            }
            imname = 'oppo_test.png'
            FOL = 'train_app_person'
            detect_fn = pdetect_fn
        elif fol == 'person':
            dictHead = {
                'time': 'p2_time',
                'strokes': 'p2_strokes',
                'width': 'p2_width',
                'height': 'p2_height',
                'position': 'p2_position'
            }
            imname = 'person_test.png'
            FOL = 'train_app_person'
            detect_fn = pdetect_fn
        elif fol == 'tree':
            dictHead = {
                'time': 't_time',
                'strokes': 't_strokes',
                'width': 't_width',
                'height': 't_height',
                'position': 't_position'
            }
            imname = 'tree_test.png'
            FOL = 'train_app_tree'
            detect_fn = tdetect_fn

        print('***** set #', i, fol, imname)

        data[dictHead['time']] = timeDifInSec(
                parsedData['drawing_info'][fol]['time_start_drawing'],
                parsedData['drawing_info'][fol]['time_end_drawing'])
        data[dictHead['strokes']] = len(parsedData['drawing_info'][fol]['strokes'])

        """
            Grab path to current working directory
        """
        os.chdir("F:\github\psychopaint\HTP")
        sys.path.append("..")
        CWD_PATH = os.getcwd()
        PATH_TO_LABELS = os.path.join(CWD_PATH,FOL,'annotations','label_map.pbtxt')
        PATH_TO_IMAGE = os.path.join(CWD_PATH,'data',imname)
        NUM_CLASSES = 1

        with open(PATH_TO_IMAGE, 'wb') as handler:
            try:
                img_data = requests.get(parsedData['drawing_info'][fol]['url']).content
                handler.write(img_data)
                print('***** saved', imname, 'successfully')
            except:
                print('***** could not save', imname)
                continue

        """
            Create variables
        """
        os.chdir("F:/github/psychopaint/HTP/models/research/object_detection")
        from object_detection.utils import label_map_util
        from object_detection.utils import visualization_utils as viz_utils

        label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
        categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
        category_index = label_map_util.create_category_index(categories)

        """
            Use model
        """
        img = Image.open(PATH_TO_IMAGE)
        if img.mode == 'RGBA':
            img = img.convert('RGB')

        w, h = img.size
        image_np = np.array(img)
        input_tensor = tf.convert_to_tensor(image_np)
        image_copy = input_tensor[tf.newaxis, ...]
        detections = detect_fn(image_copy)

        num_detections = int(detections.pop('num_detections'))
        detections = {key: value[0, :num_detections].numpy()for key, value in detections.items()}
        detections['num_detections'] = num_detections
        detections['detection_classes'] = detections['detection_classes'].astype(np.int64)

        image_np_with_detections = image_np.copy()

        """
            analyze data
        """
        rectbox = detections['detection_boxes'][0]
        (ymin, xmin, ymax, xmax) = (rectbox[0] * h, rectbox[1] * w,
                                rectbox[2] * h, rectbox[3] * w)
        print('score', detections['detection_scores'][0], '/ coor', ymin, xmin, ymax, xmax)
        hcenter = (xmin + xmax) / 2
        vcenter = (ymin + ymax) / 2

        data[dictHead["width"]] = xmax - xmin
        data[dictHead["height"]] = ymax - ymin

        hpos = 0
        vpos = 0
        if 0 <= hcenter and hcenter < (w/3):
            hpos = 1
        elif (w/3) <= hcenter and hcenter <= (2*w/3):
            hpos = 2
        elif (2*w/3) < hcenter and hcenter <= w:
            hpos = 3

        if 0 <= vcenter and vcenter < (h/3):
            vpos = 1
        elif (h/3) <= vcenter and vcenter <= (2*h/3):
            vpos = 2
        elif (2*h/3) < vcenter and vcenter <= h:
            vpos = 3

        data[dictHead["position"]] = vpos


    dataList.append(data)
    # i+=1

    print(dataList)

    os.chdir("F:\github\psychopaint\HTP")
    dataDf = pd.DataFrame(dataList)

    print(dataDf)

    h = dataDf.iloc[:, 0:5]
    p1 = dataDf.iloc[:, 5:10]
    p2 = dataDf.iloc[:, 10:15]
    t = dataDf.iloc[:, 15:20]

    h_lr = load('hscore.joblib')
    p1_lr = load('p1score.joblib')
    p2_lr = load('p2score.joblib')
    t_lr = load('tscore.joblib')

    h_score = h_lr.predict(h)
    p1_score = p1_lr.predict(p1)
    p2_score = p2_lr.predict(p2)
    t_score = t_lr.predict(t)

    score = pd.DataFrame({
        "h": h_score,
        "p1": p1_score,
        "p2": p2_score,
        "t": t_score,
        "total": h_score + p1_score + p2_score + t_score
    })

    class1_cf = load('tree1.joblib')
    class2_cf = load('tree2.joblib')
    class3_cf = load('tree3.joblib')

    class_result = [
        class1_cf.predict(score)[0],
        class2_cf.predict(score)[0],
        class3_cf.predict(score)[0]
    ]

    print(class_result)
    if class_result.count(0) != 2:
        res = 'cannot classified.'
    else:
        for i in class_result:
            if i == 1:
                res = 'normal'
            elif i == 2:
                res = 'unipolar'
            elif i == 3:
                res = 'bipolar'

    print(res)
    return(res)

import cv2
import mediapipe as mp
import math
import numpy as np
import osascript


mp_hands = mp.solutions.hands
draw = mp.solutions.drawing_utils
hands = mp_hands.Hands()

capture = cv2.VideoCapture(0)

while True:
    value, image = capture.read()
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    processed_img = hands.process(rgb_image)
    print(processed_img.multi_hand_landmarks)
    if (processed_img.multi_hand_landmarks):
        for hand_landmark in processed_img.multi_hand_landmarks:
            for finger_id, landmark_cord in enumerate(hand_landmark.landmark):
                height, width, channel = image.shape
                cx, cy = int(landmark_cord.x * width), int(landmark_cord.y * height)
                if finger_id == 4:
                    cv2.circle(image, (cx,cy), 30, (255, 0, 255), cv2.FILLED)
                    tpx, tpy = cx, cy
                if finger_id == 8:
                    cv2.circle(image, (cx,cy), 30, (255, 0, 255), cv2.FILLED)
                    ipx, ipy = cx, cy
                    cv2.line(image, (tpx, tpy), (ipx, ipy), (0, 255, 0), 9)
                    distance = math.sqrt((ipx-tpx)**2 + (ipy-tpy)**2)
                    v = np.interp(distance,[100,700],[0,100])
                    vol = "set volume output volume " + str(v)
                    osascript.osascript(vol)
            draw.draw_landmarks(image, hand_landmark, mp_hands.HAND_CONNECTIONS)
           
    cv2.imshow('Image Capture', image)
    if cv2.waitKey(1) & 0xFF==27:
        break
capture.release()
cv2.destroyAllWindows()

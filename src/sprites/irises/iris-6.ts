import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `<path id="iris-tl" x="0" y="0" d="M62.5,296.8c13.2,2.9,26.8,2.4,40.2,2.6c7.2,0,83.3-0.1,83.3,0.2c0,0,0,0,0.1,0
c0.9,0,7.4,0,11.6,0c0.1,0,0.2,0,0.3,0c17,0,33.9-0.1,50.9-0.1c10.8,0,21.5,0,32.3,0.2c4.6,0,15,2.1,17.8-3.2
c1.4-2.7,0.8-6.2,0.4-9c-0.6-4.9-1.3-9.7-2-14.6c-1.3-9.7-2.6-19.4-3.6-29.2c-2.1-20.1-2.7-40.2-2.7-60.5
c0-27.2,1.1-54.4,5.9-81.4c4-22.7,6.3-45.7-6.3-66.3c-9.7-15.8-26-27.2-44.3-31c-12.3-2.6-25.5-2.7-38-3.4
c-14-0.7-28.1-1-42.2-1.1c-28.1,0-56.3,1.1-84.3,2.6C70,3.2,57.5,2.9,46.2,6.2c-8.7,2.6-16.6,7.2-23.1,13.5
C7.6,34.6,1.5,56.1,0.6,76.9c-0.6,13.3,0,26.6-0.3,39.9c-0.2,14-0.3,28-0.3,42s0,28,0.1,42c0.1,12.1-0.6,24.6,1.4,36.7
C4.7,256,15,272.2,30.7,283.1C40.2,289.7,51.1,294.3,62.5,296.8z">
<path id="iris-tr" x="0" y="0" d="M237.7,296.8c-13.2,2.9-26.8,2.4-40.2,2.6c-7.2,0-83.3-0.1-83.3,0.2c0,0,0,0-0.1,0
c-0.9,0-7.4,0-11.6,0c-0.1,0-0.2,0-0.3,0c-17,0-33.9-0.1-50.9-0.1c-10.8,0-21.5,0-32.3,0.2c-4.6,0-15,2.1-17.8-3.2
c-1.4-2.7-0.8-6.2-0.4-9c0.6-4.9,1.3-9.7,2-14.6c1.3-9.7,2.6-19.4,3.6-29.2c2.1-20.1,2.7-40.2,2.7-60.5c0-27.2-1.1-54.4-5.9-81.4
c-4-22.7-6.3-45.7,6.3-66.3c9.7-15.8,26-27.2,44.3-31c12.3-2.6,25.5-2.7,38-3.4c14-0.7,28.1-1,42.2-1.1c28.1,0,56.3,1.1,84.3,2.6
c11.7,0.6,24.2,0.3,35.6,3.6c8.7,2.6,16.6,7.2,23.1,13.5c15.4,14.9,21.6,36.4,22.5,57.2c0.6,13.3,0,26.6,0.3,39.9
c0.2,14,0.3,28,0.3,42s0,28-0.1,42c-0.1,12.1,0.6,24.6-1.4,36.7c-3.1,18.6-13.4,34.9-29.1,45.7C260,289.7,249.1,294.3,237.7,296.8
z">
<path id="iris-bl" x="0" y="0" d="M62.5,3.2c13.2-2.9,26.8-2.4,40.2-2.6c7.2,0,83.3,0.1,83.3-0.2c0,0,0,0,0.1,0c0.9,0,7.4,0,11.6,0
c0.1,0,0.2,0,0.3,0c17,0,33.9,0.1,50.9,0.1c10.8,0,21.5,0,32.3-0.2c4.6,0,15-2.1,17.8,3.2c1.4,2.7,0.8,6.2,0.4,9
c-0.6,4.9-1.3,9.7-2,14.6c-1.3,9.7-2.6,19.4-3.6,29.2c-2.1,20.1-2.7,40.2-2.7,60.5c0,27.2,1.1,54.4,5.9,81.4
c4,22.7,6.3,45.7-6.3,66.3c-9.7,15.8-26,27.2-44.3,31c-12.3,2.6-25.5,2.7-38,3.4c-14,0.7-28.1,1-42.2,1.1
c-28.1,0-56.3-1.1-84.3-2.6c-11.7-0.6-24.2-0.3-35.6-3.6c-8.7-2.6-16.6-7.2-23.1-13.5C7.6,265.4,1.5,243.9,0.6,223.1
c-0.6-13.3,0-26.6-0.3-39.9c-0.2-14-0.3-28-0.3-42s0-28,0.1-42C0.2,87-0.5,74.6,1.5,62.5C4.7,44,15,27.8,30.7,16.9
C40.2,10.3,51.1,5.7,62.5,3.2z"/>`;

const useIds: IEyePosObj = {
    "topleft": "iris-tl",
    "topright": "iris-tr",
    "bottomleft": "iris-bl",
};

export const sprites = new IrisSprites(
    `Style 6`,
    definitions,
    useIds
);
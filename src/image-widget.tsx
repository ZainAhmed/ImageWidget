/*!
 * Copyright 2023, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, useEffect } from "react";
import { BlockAttributes } from "widget-sdk";
import { Buffer } from "buffer";
/**
 * React Component
 */

const authToken =
  "Basic NjYzYmE3NTUzZjkyNWIyODc3OTI4YTYyOkxkKDF1WUVFbmt+cG51fWJheWxlZFVwO1BXOXBheFt3K2RwO0N2a2RyREs1aihlKl1idEZ6V2tQUEpZTixYRSs=";
export interface ImageWidgetProps extends BlockAttributes {
  image: string;
  imageheight: number;
  imagewidth: number;
  margintop: number;
  marginbottom: number;
  marginright: number;
  marginleft: number;
  paddingtop: number;
  paddingbottom: number;
  paddingright: number;
  paddingleft: number;
  bordercolor: string;
  borderwidth: number;
  verticalalignment: string;
  horizontalalignment: string;
  imageborderradius: number;
  captiontext: string;
  captioncolor: string;
  captionfontsize: number;
  captionitalic: string;
  captionbold: string;
  captionverticalalignment: string;
  captionhorizontalalignment: string;
}

export const ImageWidget = ({
  image,
  imageheight,
  imagewidth,
  margintop,
  marginbottom,
  marginright,
  marginleft,
  paddingtop,
  paddingbottom,
  paddingright,
  paddingleft,
  bordercolor,
  borderwidth,
  verticalalignment,
  horizontalalignment,
  imageborderradius,
  captiontext,
  captioncolor,
  captionfontsize,
  captionitalic,
  captionbold,
  captionhorizontalalignment,
}: ImageWidgetProps): ReactElement => {
  const getPosition = (string: string, subString: string, index: number) => {
    return string.split(subString, index).join(subString).length;
  };
  useEffect(() => {
    if (image) {
      const nameEndIndex = getPosition(image, ";", 2);
      const nameIndex = image.indexOf("name");
      const imageName = image.substring(nameIndex + 5, nameEndIndex);
      const bas64Index = image.indexOf("base64");
      const imageBase64 = image.substring(bas64Index + 7);
      const binaryString = atob(imageBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/octet-stream" });
      const formData = new FormData();
      formData.append("file", blob, imageName);
      formData.append("type", "image");
      fetch("https://touchbase.lsg-group.com/api/media", {
        method: "post",
        headers: {
          Authorization: authToken,
          // "Content-Type": "multipart/form-data",
        },

        body: formData,
      }).then((response) => {
        console.log("response", response);
        //do something awesome that makes the world a better place
      });
    }
  }, [image]);

  const imageStyles = {
    width: imagewidth == 0 ? "auto" : `${imagewidth}vw`,
    height: imageheight == 0 ? "auto" : `${imageheight}vh`,
    border: `${borderwidth}px solid ${bordercolor}`,
    margin: `${margintop}% ${marginright}% ${marginbottom}% ${marginleft}%`,
    padding: `${paddingtop}% ${paddingright}% ${paddingbottom}% ${paddingleft}%`,
    borderRadius: `${imageborderradius}px`,
  };

  const containerStyles = {
    display: "flex",
    alignItems: `${verticalalignment}`,
    justifyContent: `${horizontalalignment}`,
  };
  const containerChild = {
    display: "flex",
    flexDirection: "column",
    alignItems: `${captionhorizontalalignment}`,
  };

  const captionStyles = {
    fontWeight: captionbold === "true" ? "bold" : "normal",
    fontStyle: captionitalic === "true" ? "italic" : "normal",
    fontSize: `${captionfontsize}`,
    color: `${captioncolor}`,
  };
  return (
    <div style={containerStyles}>
      <div style={containerChild}>
        <img src={image} style={imageStyles} />
        {captiontext && <p style={captionStyles}>{captiontext}</p>}
      </div>
    </div>
  );
};

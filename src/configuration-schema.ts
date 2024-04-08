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

import { UiSchema } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
import {tabs} from './components/MyFormWithTabs'

/**
 * schema used for generation of the configuration dialog
 * see https://react-jsonschema-form.readthedocs.io/en/latest/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
    type: 'object',
  properties: {
    [tabs[0].key]: {
      required: ["image"],
      type: 'object',
      properties: {
        image: {type: "string",title: "image"},
        horizontalalignment: {
          title: "Image horizontal alignment.",
          type: "string",
          default: "center",
          oneOf: [
            {
              const: "flex-start",
              title: "left",
            },
            {
              const: "center",
              title: "center",
            },
            {
              const: "flex-end",
              title: "right",
            },
          ],
        }, 
        captiontext: {
          title: "Caption Text",
          type: "string",
        },    captionhorizontalalignment: {
          title: "Caption horizontal alignment.",
          type: "string",
          default: "center",
          oneOf: [
            {
              const: "flex-start",
              title: "left",
            },
            {
              const: "center",
              title: "center",
            },
            {
              const: "flex-end",
              title: "right",
            },
          ],
        },
      }
    },
    [tabs[1].key]:{
      type: 'object',
      properties: {
        imageheight: {type: "number",title: "Image Height",default: 0},
        imagewidth: {type: "number",title: "Image Width",default: 0},
        bordercolor: {type: "string",title: "Border Color",default: "#000000"},
        borderwidth: {type: "integer",default: 0},
        imageborderradius: {type: "integer",default: 0},
        captioncolor: {type: "string",title: "Caption color",default: "#000000"},
        captionfontsize: {type: "integer",title: "Caption font size",default: 12},
        captionitalic: {type: "boolean",title: "Make caption italic",default: false},
        captionbold: {type: "boolean",title: "Make caption bold",default: false},
      }
    },
    [tabs[2].key]: {
      type: 'object',
      properties: {
        margintop: { type: "integer", title: "Image top margin", default: 0},
        marginbottom: {type: "integer", title: "Image bottom margin",default: 0},
        marginright: {type: "integer",title: "Image right margin",default: 0},
        marginleft: {type: "integer",title: "Image left margin",default: 0},
        paddingtop: {type: "integer",title: "Image top padding",default: 0},
        paddingbottom: {type: "integer",title: "Image bottom padding",default: 0},
        paddingright: {type: "integer",title: "Image right padding",default: 0},
        paddingleft: {type: "integer",title: "Image left padding",default: 0},
      }
    }
  }
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/
 */
export const uiSchema: UiSchema = {
 
  [tabs[0].key]: {
        image:{
          "ui:help": "Please upload an image file",
          "ui:widget": "file",
          "ui:options": { accept: "image/*" },
        }
      },
      [tabs[1].key]:{
        imagewidth: {
          "ui:widget": "updown",
          "ui:help":"The value is a percentage of the page width",
        },
        imageheight: {
          "ui:widget": "updown",
          "ui:help": "The value is a percentage of the page height",
        },
        bordercolor: {
          "ui:widget": "color",
          "ui:help": "The value is in pixels",
        },
        borderwidth: {
          "ui:widget": "updown",
          "ui:help": "The value is in pixels",
        },
        captioncolor: {
          "ui:widget": "color",
          "ui:help": "The value is in pixels",
        },
        captionfontsize: {
          "ui:widget": "updown",
          "ui:help": "The value is in pixels",
        },
      },
      [tabs[2].key]: {
        margintop: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        marginbottom: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        marginright: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        marginleft: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },  
        paddingtop: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        paddingbottom: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        paddingright: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
        paddingleft: {
          "ui:widget": "updown",
          "ui:help": "The value is in percentage",
        },
      },
};

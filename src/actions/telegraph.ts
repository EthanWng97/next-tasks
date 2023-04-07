import * as cheerio from "cheerio";
import axios from "axios";
import envs from "@/envs";

export function htmlToNode(html: string): any {
  const $ = cheerio.load(html);
  const dom = $.root()[0].children[0];
  const node = domToNode(dom).children;
  return node;
}
export function domToNode(domNode: any): any {
  if (domNode.nodeType === 3) {
    // Text node
    return domNode.data;
  }
  if (domNode.nodeType !== 1) {
    // Non-element node
    return false;
  }

  const nodeElement: any = {};
  nodeElement.tag = domNode.tagName.toLowerCase();

  // Extract attributes
  const attrs: any = {};
  const attributeNames = ["href", "src"];
  attributeNames.forEach((name) => {
    const value = domNode.attribs[name];
    if (value) {
      attrs[name] = value;
    }
  });
  if (Object.keys(attrs).length > 0) {
    nodeElement.attrs = attrs;
  }

  // Extract child nodes
  const childNodes = domNode.childNodes;
  if (childNodes.length > 0) {
    const children: any[] = [];
    childNodes.forEach((childNode: any) => {
      const childElement = domToNode(childNode);
      if (childElement) {
        children.push(childElement);
      }
    });
    if (children.length > 0) {
      nodeElement.children = children;
    }
  }

  return nodeElement;
}

export async function createPage(node: any, title: string) {
  try {
    const response = await axios.post(
      "https://api.telegra.ph/createPage",
      {
        access_token: envs.value.telegraph.access_token,
        title: title,
        content: JSON.stringify(node),
        return_content: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

import {downloadBlob} from "@milkscout/react";

export const downloadImage = async ( name: string,url: string,) => {
   const response = await fetch(url);
   const blob = await response.blob();
   downloadBlob(name, blob)
}

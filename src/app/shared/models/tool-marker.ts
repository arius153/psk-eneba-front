import {ToolResponse} from './tool-response';

export class ToolMarker {
  id: number;
  tool: ToolResponse;
  marker: google.maps.LatLngLiteral;
  constructor(tool: ToolResponse, marker: google.maps.LatLngLiteral) {
    this.id = tool.id;
    this.tool = tool;
    this.marker = marker;
  }
}

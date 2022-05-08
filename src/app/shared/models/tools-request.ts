export class ToolsRequest {

  public sortBy: string;
  public sortReversed = false;

  public minPrice: number;
  public maxPrice: number;

  selectedCategories: Array<number> = [];
}

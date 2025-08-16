export interface CategoryProps {
  categoryId: number;
  categoryName: string;
}

export interface Category {
  message: string;
  data: CategoryProps[];
}

export interface TagProps {
  tagId: number;
  tagName: string;
}

export interface Tag {
  message: string;
  data: TagProps[];
}

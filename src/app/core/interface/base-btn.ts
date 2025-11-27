export interface BaseBtn {
  text: string;
  link: string;
  target: string;
  class: Class;
}

interface Class {
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  lineHeight?: string;
  padding?: string;
  fontWeight?: string;
  border?: string;
  fontSize?: string;
  display?: string;
}

export interface Banner {
  main_image: string;
  alt_image: string;
  page_name: string;
}

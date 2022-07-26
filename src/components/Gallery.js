import { Photo } from "./Photo";
import { SortableElement } from "react-sortable-hoc";

/**
 * Gallery grid component with drag and drop functionality
 * @param {*} props 
 *  
 */
export const Gallery = (props) => {
  const { items, setSelectedImage } = props;
  const SortablePhoto = SortableElement((item) => {
    return <Photo setSelectedImage={setSelectedImage} {...item} />;
  });
  return (
    <ul>
      {items &&
        items.map((element, i) => {
          return (
            <SortablePhoto
              index={i}
              sortIndex={element.position}
              item={element}
              key={`item-${i}`}
            />
          );
        })}
    </ul>
  );
};

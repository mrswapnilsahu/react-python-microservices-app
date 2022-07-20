import Photo from './Photo';
import { SortableElement } from "react-sortable-hoc";

export default function Gallery (props) {

    const { items } = props;
    const SortablePhoto = SortableElement(item => {
        return <Photo {...item} />
    });
    return <ul>
        {items.map((element, i) => {
            return <SortablePhoto index={i} sortIndex={element} item={element} key={`item-${i}`} />
        })}
        
  </ul>
}
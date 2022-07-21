import Photo from './Photo';
import { SortableElement } from "react-sortable-hoc";

export default function Gallery (props) {

    function handleClick(imgSrc){
        debugger;
        console.log("Clicked", imgSrc);
    }
    const { items } = props;
    const SortablePhoto = SortableElement(item => {
        return <Photo {...item} />
    });
    return <ul>
        {items.map((element, i) => {
            return <SortablePhoto index={i} sortIndex={element.position} item={element} key={`item-${i}`} />
        })}
        
  </ul>
}
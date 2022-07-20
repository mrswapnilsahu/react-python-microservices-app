export default function Photo ({item}) {
    return <div>
        <p>{item.title}</p>
        <img src={item.src} alt={item.title} style={{margin: '4px'}} />
    </div>
}
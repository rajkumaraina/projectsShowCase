import './index.css'

const EachItem = props => {
  const {item} = props
  const {id, imageUrl, name} = item
  return (
    <li className="listItem">
      <img src={imageUrl} alt={name} className="eachImg" />
      <p className="eachPara">{name}</p>
    </li>
  )
}
export default EachItem

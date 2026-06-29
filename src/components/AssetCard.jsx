
function AssetCard({ name, price, children }) {
  return (
    <div className="asset-card-item">
      <h3>{name}</h3>
      <p className="stat-precio">${price}</p>
      <div className="asset-card-content">
        {children}
      </div>
    </div>
  )
}

export default AssetCard
const carrito = document.querySelector('#carrito');
const listaItems = document.querySelector('.list-group')
const template = document.querySelector('#template');
const footer = document.querySelector('#footer')
const templateFooter = document.querySelector('#templateFooter')
const fragmento = document.createDocumentFragment()

document.addEventListener('click', (e) => {
  if (e.target.matches(".card .btn-outline-primary")) {
    agregarCarrito(e)
  }
  if (e.target.matches(".list-group-item .btn-success")) {
    btnAgregar(e)
  }
  if (e.target.matches(".list-group-item .btn-danger")) {
    btnQuitar(e)
  }
  if (e.target.matches(".btn-outline-info")) {
    finalizar()
  }
})

let itemCarrito = []

const agregarCarrito = (e) => {
  listaItems.style.display = 'initial'
  const item = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio)
  }
  
  const indice = itemCarrito.findIndex(
    (producto) => producto.id === item.id
  )

  if (indice === -1) {
    itemCarrito.push(item)
  } else {
    itemCarrito[indice].cantidad ++
    // itemCarrito[indice].precio = itemCarrito[indice].cantidad * item.precio
  }
  mostrarInfo()
  
}

const mostrarInfo = () => {
  carrito.textContent = ''

  itemCarrito.forEach(item => {
    const clone = template.content.cloneNode(true)  
    clone.querySelector(".text-white .lead").textContent = item.titulo
    clone.querySelector(".badge").textContent = item.cantidad
    clone.querySelector("div .lead span").textContent = item.cantidad * item.precio 
    clone.querySelector('.btn-danger').dataset.id = item.id
    clone.querySelector('.btn-success').dataset.id = item.id

    fragmento.appendChild(clone)
  })

  carrito.appendChild(fragmento)
  mostrarFooter()
}

const mostrarFooter = () => {
  footer.textContent = ''

  const total = itemCarrito.reduce(
    (acc, current) => acc + current.cantidad * current.precio, 0 
  )

  const clone = templateFooter.content.cloneNode(true)  
  clone.querySelector("span").textContent = total
  footer.appendChild(clone)
}


const btnAgregar = (e) => {
  // console.log("le diste click a aumentar", e.target.dataset.id);
  itemCarrito = itemCarrito.map(item => {

    if (item.id === e.target.dataset.id) {
      item.cantidad++
    }
    return item
  })

  mostrarInfo()
}

const btnQuitar = (e) => {
  // console.log("le diste click a quitar", e.target.dataset.id);
  itemCarrito = itemCarrito.filter(item => {
  
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--
        if (item.cantidad === 0) return
        return item
      }
    }
    return item
  })

  mostrarInfo()
};


const finalizar = () => {
  footer.textContent = ''
  listaItems.style.display = 'none'
  itemCarrito = []
  const total = itemCarrito.reduce(
    (acc, current) => acc * current.cantidad, 0 
  )
  const clone = templateFooter.content.cloneNode(true)  
  clone.querySelector("span").textContent = total
  footer.appendChild(clone)
}
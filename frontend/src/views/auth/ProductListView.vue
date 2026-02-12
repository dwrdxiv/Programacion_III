<template>
    <div class="header">
        <nav>
        <h1>iCommerce</h1>
        </nav>
        

        <div class="minimenu">
        <button @click="router.push('/')">Inicio</button>
        <button @click="router.push('/products')">Productos</button>
        <button>Carrito</button>
        </div>
    </div>
    <div class="background">
        <div class="products-page" style="width: 80%; margin: auto; padding: 2rem;">
            <section v-if="auth.user?.nivel === 'admin'" class="create-product" style="background-color: white; padding: 1rem; border-radius: 15px; width: 50%; margin: auto; margin-bottom: 2rem;">
                <h3>Registrar Nuevo Producto</h3>
                <form @submit.prevent="saveProduct">
                    <input v-model="form.nombre" placeholder="Nombre" required style="width: auto;" /> <br>
                    <input v-model="form.codigo" placeholder="Código" required style="width: auto;"/> <br>
                    <input v-model.number="form.precio" type="number" step="1" placeholder="Precio" required style="width: 3rem;"/> <br>
                    <textarea v-model="form.descripcion" placeholder="Descripción" style="width: auto; height: 1rem;"></textarea><br>
                    <button type="submit" style="background-color: greenyellow; cursor: pointer; width: 100%;">Guardar Producto</button>
                </form>
                <p v-if="error" style="color: red">{{ error }}</p>
            </section>
         </div>
        <div class="products-container" >
    <h2 style="color: white;">Productos</h2>

    <table class="products-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <td><strong>{{ prod.codigo }}</strong></td>
          <td>{{ prod.nombre }}</td>
          <td>{{ prod.precio }} $</td>
          <td>{{ prod.descripcion || 'Sin descripción' }}</td>
          <td>
            <div class="actions-cell">
              <button class="btn-cart" title="Añadir al carrito" style="background-color: greenyellow; cursor: pointer;">
                🛒
              </button>

              <template v-if="auth.user?.nivel === 'admin'">
                <button @click="handleEdit(prod)" class="btn-edit" title="Editar" style="background-color: yellow; cursor: pointer;">
                  ✏️
                </button>
                <button @click="handleDelete(prod.id)" class="btn-delete" title="Eliminar" style="background-color: red; cursor: pointer;">
                  🗑️
                </button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p v-if="products.length === 0">No hay productos registrados.</p>
  </div>    
    </div>
  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const auth = useAuthStore()
const products = ref([])
const error = ref('')
const form = reactive({ nombre: '', codigo: '', precio: 0, descripcion: '' })
const router = useRouter()



const fetchProducts = async () => {
  const res = await api.get('/api/products')
  products.value = res.data
}

const saveProduct = async () => {
  try {
    // Validación frontend precio > 0 (15 pts)
    if (form.precio <= 0) {
      error.value = "El precio debe ser mayor a cero"
      return
    }
    await api.post('/api/products', form)
    fetchProducts() // Recargar lista
    Object.assign(form, { nombre: '', codigo: '', precio: 0, descripcion: '' }) // Limpiar
  } catch (err) {
    error.value = err.response?.data?.message || "Error al guardar"
  }
}

const handleDelete = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este producto?')) return

  try {
    await api.delete(`/api/products/${id}`)
    // Refrescar la lista automáticamente
    fetchProducts() 
    alert('Producto eliminado con éxito')
  } catch (err) {
    alert('Error al eliminar: ' + (err.response?.data?.message || 'Sin permiso'))
  }
}

const handleEdit = (product) => {
  // Para la tarea, puedes simplemente cargar los datos en el formulario de arriba
  // o usar un prompt rápido para el precio como prueba:
  const nuevoPrecio = prompt(`Nuevo precio para ${product.nombre}:`, product.precio)
  
  if (nuevoPrecio && nuevoPrecio > 0) {
    actualizarProducto(product.id, { ...product, precio: nuevoPrecio })
  } else {
    alert('Precio inválido')
  }
}

const actualizarProducto = async (id, data) => {
  try {
    await api.put(`/api/products/${id}`, data)
    fetchProducts()
    alert('Producto actualizado')
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchProducts)
</script>

<style scoped>
.background {
  min-height: 80vh;
  height: 50rem;
  display:grid;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #0e191f, #093453);
}
.header { font-family: Arial, sans-serif; padding: 0rem;} 
.header nav { display: flex; justify-content: space-between; padding: .5rem; background: #ffffff; color: rgb(0, 0, 0); }

.minimenu { display: inline-flex; background-color: #e4e4e4; width: 100%;height: 2rem; justify-content: center; gap: 1rem; border-bottom: 2px solid #00ffff; }
.minimenu button { font-family: Arial, sans-serif; border: none;background: none; border: 15; padding: 0.5rem 1rem; cursor: pointer; }
.minimenu button:hover { background: rgb(0, 177, 153); color: rgb(255, 255, 255); border-color: rgb(0, 50, 33); transition-duration: 400ms; }

.products-table { width: 100%; margin-top: 1rem; padding: 3rem; background-color: white; text-align: center; border-radius: 15px;}
.products-table td, .products-table th { border: 1px solid #ddd; padding: .5rem 1rem; border-radius: 5px; }
</style>
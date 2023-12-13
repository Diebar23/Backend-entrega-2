const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    
    
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct(nuevoObjeto) {
        let {title, description, price, image, code, stock} = 
        nuevoObjeto;

        
        if(!title || !description || !price || !image || !code || !stock) 
        {
            console.log("Todos los campos deben estar completos");
            return;
        }
        
        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

    
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            image,
            code,
            stock,            
        }
        
        this.products.push(newProduct);

        //Guardamos el array en el archivo

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products)

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id ===
                id);

                if(buscado) {
                    console.log("Producto no encontrado");
                }else {
                    console.log("Producto encontrado");
                    return buscando;
                }

        } catch (error) {
            console.log("Error al leer archivo", error);
        }
        
        const product = this.products.find(item => item.id === id);
        if (!product) {
            console.log("Producto no encontrado");
        } else {
            console.log("Producto encontrado:", product);
        }
    }

    //Nuevos metodos desafio 2

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        }catch (error) {
            console.log("Error al leer archivo", error);
        }
    }

    async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify
                (arrayProductos, null, 2))
        } catch (error) {
            console.log("Error al guardar archivo", error);
        }
    }

    //Actualizamos algun producto
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item=> item.id === 
            id);

            if(index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("No se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar", error);
        }
    }


}

//Testing


const hamburguesa = {
    title: "hamburguesa",
    description: "100 % carne vacuna",
    price: 800,
    img: "sin imagen",
    code:"abc123",
    stock: 30
}

manager.addProduct(hamburguesa);


const milanesa = {
    title: "milanesa",
    description: "100 % carne vacuna",
    price: 900,
    img: "sin imagen",
    code:"abc124",
    stock: 30
}

manager.addProduct(milanesa);


async function testeamosBusquedaPorId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);

}

testeamosBusquedaPorId();


const { ShoppingChart } = require('../models')
const { Product } = require('../models')

class ShoppingChartController {
    static findShoppingChart (req, res, next) {
        const UserId = req.currentUserId
        const options = {
            where: {
                UserId
            },
            order: [['id', 'asc']],
            include: [ Product ],
            attributes: ['id', 'UserId', 'quantity', 'ProductId']
        }
        async function getShoppingChart () {
            try {
                const shoppingchart = await ShoppingChart.findAll(options)
                res.status(200).json({
                    ShoppingCharts: shoppingchart
                })
            }
            catch(error) {
                next(error)
            }
        }
        getShoppingChart()
    }

    static createShoppingChart (req, res, next) {
        const { ProductId, quantity } = req.body
        const UserId = req.currentUserId
        
        async function createNewShoppingChart () {
            try {
                const shoppingChartvalues = {
                    UserId,
                    ProductId,
                    quantity
                }
                const newShopingChart = await ShoppingChart.create(shoppingChartvalues)

                const currentStock = await Product.decrement({ stock: Number(quantity) }, { where: { id: ProductId } })
                res.status(201).json({ ShoppingChart: newShopingChart })
            }
            catch(error) {
                next(error)
            }
        }
        createNewShoppingChart()
    }

    static deleteShoppingChart (req, res, next) {
        const ShoppingChartId = req.params.id
        const ProductId = ''
        const options = {
            returning: true,
            where: {
                id: ShoppingChartId
            }
        }

        async function removeShoppingChart () {
            try {
                const shoppingchart = await ShoppingChart.findOne({ where: { id: ShoppingChartId } })
                const ProductId = shoppingchart.ProductId
                const quantity = shoppingchart.quantity

                const currentStock = await Product.increment({ stock: Number(quantity) }, { where: { id: ProductId } })
                const deletedShoppingChart = await ShoppingChart.destroy(options)
                
                res.status(200).json({ Result: 'Successfully Deleted' })
            }
            catch(error) {
                next (error)
            }
        }
        removeShoppingChart()
    }
}

module.exports = ShoppingChartController
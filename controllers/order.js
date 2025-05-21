const orders = [];

const createOrder = (req, res) => {
  const { items, shippingAddress, paymentDetails } = req.body;
  const userId = req.user.userId;

  try {
    const order = {
      id: String(orders.length + 1),
      userId,
      items,
      shippingAddress,
      paymentDetails: {
        last4: paymentDetails.cardNumber.slice(-4),
        brand: 'visa' // In a real app, you would determine this
      },
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    orders.push(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = (req, res) => {
  const userId = req.user.userId;
  try {
    const userOrders = orders.filter(order => order.userId === userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    const order = orders.find(o => o.id === id && o.userId === userId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getOrders, getOrderById };

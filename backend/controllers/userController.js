/**
 * @file CRUD operations for User resource.
 */

let User;

exports.setModels = (models) => {
    console.log('[userController] setModels called with:', Object.keys(models || {}));
    User = models && models.User;
    if (!User) console.warn('[userController] Warning: User model not found in provided models.');
};

/**
 * Creates a new user.
 * @route POST /api/users
 */
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves all users.
 * @route GET /api/users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err); 
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a single user by ID.
 * @route GET /api/users/:id
 */
exports.getUser = async (req, res) => {
  try {
    console.log('Requested user ID:', req.params.id);
    console.log('User model exists?', !!User);
    if (!User) {
      return res.status(500).json({ error: 'User model not initialized' });
    }
    const user = await User.findByPk(req.params.id);
    console.log('User found:', user);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error in getUser controller:', err); 
    res.status(500).json({ error: err.message });
  }
};

/**
 * Updates a user by ID.
 * @route PUT /api/users/:id
 */
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Deletes a user by ID.
 * @route DELETE /api/users/:id
 */
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
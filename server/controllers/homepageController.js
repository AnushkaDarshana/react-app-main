const { Homepage } = require('../models');

// Get all homepage data
exports.getAllHomepageData = async (req, res) => {
  try {
    const data = await Homepage.findAll();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new homepage data entry
exports.createHomepageData = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const data = await Homepage.create({ title, description });
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a homepage data entry
exports.deleteHomepageData = async (req, res) => {
  const { id } = req.params;
  
  try {
    await Homepage.destroy({ where: { id } });
    res.json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a homepage entry
exports.updateHomepageData = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  console.log("INNN");

  try {
    const updatedData = await Homepage.update({ title, description }, { where: { id } });
    res.json(updatedData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

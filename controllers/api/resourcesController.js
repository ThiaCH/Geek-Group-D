const Resource = require("../../models/resource");

const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json({ message: "New resource created", newResource });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!resource) {
      return res.status(404).send({ message: "Resource not found" });
    }
    res.send(resource);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteResource = async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).send({ message: "Resource not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
};

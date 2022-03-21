const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    Include: {
      model: Product,
      through: ProductTag,
    }
  })
  .then(tags => {
    res.json(tags);
  })
  .catch((err) => res.status(500).json(err));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      through: ProductTag,
    }
  })
  .then(tags => {
    res.json(tags);
  })
  .catch((err) => res.status(500).json(err));
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((createdTag) => res.status(200).json(createdTag))
    .catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => res.status(200).json(updatedTag))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => res.status(200).json(deletedTag))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

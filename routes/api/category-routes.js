const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    Include: Product,
  })
  .then(categories => {
    res.json(categories);
  })
  .catch((err) => res.status(500).json(err));
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: Product,
  })
  .then(category => {
    res.json(category);
  })
  .catch((err) => res.status(500).json(err));
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCat) => res.status(200).json(newCat))
  .catch((err) => res.status(500).json(err));
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCat) => res.status(200).json(updatedCat))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedCat) => res.status(200).json(deletedCat))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;

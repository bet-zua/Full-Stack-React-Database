const express = require('express');
const { User, Course } = require('./models');
const { asyncHandler } = require('./middleware/async-handler');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();


// Route that returns the currently authenticated user and a 200 HTTP status code
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  //return res.status(500).json;
  let user = req.currentUser; 
  let authenticatedUser = await User.findOne({
      where: {id: user.id},
      attributes: {
          exclude: ['createdAt', 'updatedAt']
      }
  });
  res.status(200).json(authenticatedUser);
}));
  
// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location( '/' ).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }));

// Route that returns a list of all courses including the User that owns each course 
router.get('/courses', asyncHandler(async (req, res) => {
    const list = await Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: [{
            model: User,
            attributes: [ 'firstName', 'lastName', 'emailAddress' ],
        }]
    });
    res.status(200).json(list);
}));

// Route that returns the corresponding course along with the User that owns that course
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk( req.params.id, {
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: [{
            model: User,
            attributes: [ 'firstName', 'lastName', 'emailAddress' ],
        }]
      });
    if (course === null) {
        const err = new Error('Course does not exist.');
        err.status = 404;
        throw err;
    } else { res.json(course); }
}));

// Route that creates a new course, sets location header to URI for newly created course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const user = req.currentUser;
        const course = await Course.create({ ...req.body, userId: user.id });
        res.status(201).location(`/api/courses/${course.id}`).end();
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });
        } else {
          throw error;
        }
    }
}));

// Route that updates corresponsing course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const user = req.currentUser;
        const course = await Course.findByPk( req.params.id );
        if ( course.userId === user.id ) {
          await course.update( req.body );
          res.status(204).end();
        } else {
          const error = new Error('Course does not exist.');
          error.status = 403;
          throw error;
        }
      } catch ( error ) {
        if ( error.name === 'SequelizeValidationError' || error.name ===
          'SequelizeUniqueConstraintError' ) {
          const errors = error.errors.map( err => err.message );
          res.status( 400 ).json({errors});
        } else {
          throw error;
        }
      }
}));

// Route deletes corresponding course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if(course) {
    await course.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({message: 'Course Not Found'});
  }
}));


module.exports = router;

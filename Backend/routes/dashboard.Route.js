const express = require("express");
const dashboardModel = require("../model/dashboard.Model");
const dashboardRouter = express.Router();

dashboardRouter.get("/", async (req, res) => {
  const query = {};
  try {
    const posts = await dashboardModel.find(query);
    res.send({ message: "dashbpard working fine" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

dashboardRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new dashboardModel(payload);
    await newPost.save();
    res.send("newwmployee created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

dashboardRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const empy = await dashboardModel.findById(id);
    if (!empy) {
      res.status(404).send({ message: "Emplyee not found" });
    } else {
      res.send({ empy });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

dashboardRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const empypost = await dashboardModel.findById(id);
    const userID_in_post = empypost.userID;
    const userID_in_req = req.body.userID;
    if (userID_in_post !== userID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed" });
    } else {
      await dashboardModel.findByIdAndUpdate(id, payload);
      res.send("Updated post successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

dashboardRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await dashboardModel.findById(id);
    const userID_in_post = post.userID;
    const userID_in_req = req.body.userID;
    if (userID_in_post !== userID_in_req) {
      res.status(401).send({ message: "You are not authorized to proceed" });
    } else {
      await dashboardModel.findByIdAndDelete(id);
      res.send("Deleted post successfully");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Something went wrong" });
  }
});

//filter-/employee?department=HR
dashboardRouter.get("/", async (req, res) => {
    try {
      const query = req.query.department ? { department: req.query.department } : {};
      const posts = await dashboardModel.find(query);
      res.send({ posts });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
    }
  });

  ///employee?page=2&limit=10
  dashboardRouter.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalPosts = await dashboardModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await dashboardModel.find().skip(skip).limit(limit);

        res.send({
            message: "Dashboard working fine",
            currentPage: page,
            totalPages: totalPages,
            posts: posts,
        });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

///employee?sortBy=salary&sortOrder=asc
dashboardRouter.get("/", async (req, res) => {
 
    try {
        const sortBy = req.query.sortBy || "salary"; // Default to sorting by salary
        const sortOrder = req.query.sortOrder || "asc"; // Default to ascending order

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

        const posts = await dashboardModel.find().sort(sortOptions);

        res.send({
            message: "Dashboard working fine",
            sortedBy: sortBy,
            sortOrder: sortOrder,
            posts: posts,
        });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
});

module.exports = {
  dashboardRouter,
};


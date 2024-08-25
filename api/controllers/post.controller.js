import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
// GetPostss
export const getPosts = async (req, res) => {
  const query = req.query; // getting query and using it to get specific result
  const city = query.city ? query.city.trim().toLowerCase() : undefined;
  const type = query.type ? query.type.trim().toLowerCase() : undefined;
  const property = query.property
    ? query.property.trim().toLowerCase()
    : undefined;
  const bedroom = query.bedroom ? parseInt(query.bedroom) : undefined;
  const minPrice = query.minPrice ? parseInt(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? parseInt(query.maxPrice) : undefined;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: bedroom || undefined,
        price: {
          gte: minPrice || undefined,
          lte: maxPrice || undefined,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500), json({ message: "Failed to get Posts" });
  }
};

// getPost;

// export const getPost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//       include: {
//         postDetail: true,
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//       },
//     });

//     const token = req.cookies?.token;
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//         if (!err) {
//           const saved = await prisma.savedPost.findUnique({
//             where: {
//               userId_postId: {
//                 postId: id,
//                 userId: payload.id,
//               },
//             },
//           });
//           res.status(200).json({ post, isSaved: saved ? true : false });
//         }
//       });
//     }
//     res.status(200).json({ ...post, isSaved: false });
//   } catch (error) {
//     console.log(error);
//     res.status(500), json({ message: "Failed to get Post" });
//   }
// };

//AddPost;
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500), json({ message: "Failed to create Posts" });
  }
};

//UpdatePost;

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500), json({ message: "Failed to get Posts" });
  }
};

//DeletePost;

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

// export const getPost = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//       include: {
//         postDetail: true,
//         user: {
//           select: {
//             username: true,
//             avatar: true,
//           },
//         },
//       },
//     });

//     const token = req.cookies?.token;
//     if (token) {
//       jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//         if (!err) {
//           const saved = await prisma.savedPost.findUnique({
//             where: {
//               userId_postId: {
//                 postId: id,
//                 userId: payload.id,
//               },
//             },
//           });
//           res.status(200).json({ post, isSaved: saved ? true : false });
//         }
//       });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     console.log(error);
//     res.status(500), json({ message: "Failed to get Posts" });
//   }
// };

// //AddPost;
// export const addPost = async (req, res) => {
//   const body = req.body;
//   const tokenUserId = req.userId;
//   try {
//     const newPost = await prisma.post.create({
//       data: {
//         ...body.postData,
//         userId: tokenUserId,
//         postDetail: {
//           create: body.postDetail,
//         },
//       },
//     });
//     res.status(200).json(newPost);
//   } catch (error) {
//     console.log(error);
//     res.status(500), json({ message: "Failed to create Posts" });
//   }
// };

// //UpdatePost

// export const updatePost = async (req, res) => {
//   try {
//     res.status(200).json();
//   } catch (error) {
//     console.log(error);
//     res.status(500), json({ message: "Failed to get Posts" });
//   }
// };

// //   DeletePost

// export const deletePost = async (req, res) => {
//   const id = req.params.id;
//   const tokenUserId = req.userId;

//   try {
//     const post = await prisma.post.findUnique({
//       where: { id },
//     });

//     if (post.userId !== tokenUserId) {
//       return res.status(403).json({ message: "Not Authorized!" });
//     }

//     await prisma.post.delete({
//       where: { id },
//     });

//     res.status(200).json({ message: "Post deleted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to delete post" });
//   }
// };
// }

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    let userId;
    const token = req.cookies?.token;
    if (!token) {
      userId = null;
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          userId = null;
        } else {
          userId = payload.id;
        }
      });
    }
    const saved = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          postId: id,
          userId,
        },
      },
    });
    res.status(200).json({ ...post, isSaved: saved ? true : false });
  } catch (error) {
    console.log(error);
    res.status(500), json({ message: "Failed to get Posts" });
  }
};

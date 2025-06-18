const {moviesModel} = require('../models');

const getMovies = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const includeComments = req.query.includeComments === 'true';

    const pipeline = [];

    if (includeComments) {
        pipeline.push(
            {
                $match: {
                    num_mflix_comments: {$gte: 1}
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'movie_id',
                    as: 'comments'
                }
            },
            // {
            //     $addFields: {
            //         comments: {
            //             $slice: [
            //                 {
            //                     $sortArray: {
            //                         input: "$comments",
            //                         sortBy: {date: -1}
            //                     }
            //                 }, 0, 5
            //             ]
            //         }
            //     }
            // }
        );
    }

    const total = await moviesModel.countDocuments();

    pipeline.push({$skip: skip}, {$limit: limit});

    const movies = await moviesModel.aggregate(pipeline);

    res.status(200).json({
        success: true,
        data: movies,
        pagination: {total, page, limit, pages: Math.ceil(total / limit)}
    });
};

module.exports = {
    getMovies
};

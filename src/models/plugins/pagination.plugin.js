const paginatePlugins = (schema) => {
    schema.paginate = async (query = {}, options) => {
        let { page = 1, limit = 10 } = options;
        limit = parseInt(limit, 10);
        page = parseInt(page, 10);
        const { count, rows } = await schema.findAndCountAll({
            ...query,
            limit,
            offset: (page - 1) * limit,
        });
        const total_pages = parseInt(count / limit, 10) + 1;
        return {
            result: rows,
            meta_data: {
                next_page: page < total_pages ? page + 1 : page,
                prevPage: page > 1 ? page - 1 : 1,
                total_pages,
                hasPrevPage: !!page > 1,
                hasNextPage: !!page < total_pages,
            },
        };
    };
};

module.exports = { paginatePlugins };

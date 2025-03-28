const createError = require('http-errors');

const {
    searchReportsSchema
} = require('../validations/reportValidations');

const ReportServices = require('../services/reportServices');

class StatisticControllers {

    static async getWithFilteredStatisticsReports(req, res, next) {
        try {
            const { error, value } = searchReportsSchema.validate(req.query);
            if (error) {
                return next(createError(400, error.details[0].message));
            }

            const stats = await ReportServices.getReportStatistics(value);

            const formattedData = stats.reduce((acc, data) => {
                acc[data.category] = data.count;
                return acc;
            }, {});

            // let location = [];

            // if (value.village) location.push(value.village);
            // if (value.subdistrict) location.push(value.subdistrict);
            // if (value.district) location.push(value.district);
            // if (value.province) location.push(value.province);

            // let formatLocation = location.toString();
            // if(location.length > 1) {
            //     formatLocation = formatLocation.split(',').join(', ');
            // }

            const location = [value.village, value.subdistrict, value.district, value.province]
                .filter(Boolean) // ambil nilai yang ada (tidak undefined/null)
                .join(', ') || "all";

            if (Object.keys(formattedData).length === 0) {
                return res.status(200).json({
                    status: 'success',
                    message: `There are no reports found in ${location || "the selected"} area.`,
                    data: {
                        "Bangunan Roboh": 0,
                        "Bangunan Rusak": 0,
                        "Jalan Rusak": 0,
                        "Jembatan Rusak": 0,
                        "Sampah Berserakan": 0
                    },
                });
            }

            return res.status(200).json({
                status: 'success',
                message: `Reports location data from ${location} area.`,
                data: formattedData,
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = StatisticControllers;

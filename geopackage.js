// geopackage.js
// Martin Pravda

/*jslint browser */

function geopackage(
    db
) {
    function get_feature_tables() {
        return db.exec(
            `
            SELECT
                c.table_name AS name,
                g.geometry_type_name AS geom_type,
                c.srs_id AS srs,
                g.column_name as geom_column_name
            FROM
                gpkg_contents c
            LEFT JOIN
                gpkg_geometry_columns g
            ON
                c.table_name = g.table_name
            WHERE
                c.data_type = 'features';
            `
        );
    }

    function get_feature(table_name, column_names = []) {
        let columns = (
            column_names.length > 0
            ? column_names.join(", ")
            : " * "
        )

        return db.exec(
            `
                SELECT
                    ${columns}
                FROM
                    ${table_name};
            `
        );
    }

    function get_feature_as_geojson(
        table_name,
        geometry_columm,
        column_names = []
    ) {

        return db.exec(
            `
                SELECT 
                    json_object(
                        'type', 'FeatureCollection', 
                        'features', json_group_array(
                         json_object(
                            'type', 'Feature',
                            'geometry', json(
                                AsGeoJSON(${geometry_columm})
                            )
                        )
                    )
                ) AS geometry
                FROM ${table_name};
            `
        );
    }

    return Object.freeze({
        get_feature,
        get_feature_as_geojson,
        get_feature_tables
    });
}

export default Object.freeze(geopackage);
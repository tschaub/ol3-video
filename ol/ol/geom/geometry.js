goog.provide('ol.geom.Geometry');
goog.provide('ol.geom.GeometryType');

goog.require('goog.asserts');
goog.require('goog.functions');
goog.require('ol.Observable');
goog.require('ol.proj');


/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 * @todo api
 */
ol.geom.GeometryType = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};


/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 * @todo api
 */
ol.geom.GeometryLayout = {
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM'
};



/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * @constructor
 * @extends {ol.Observable}
 * @fires change Triggered when the geometry changes.
 * @todo api
 */
ol.geom.Geometry = function() {

  goog.base(this);

  /**
   * @protected
   * @type {ol.Extent|undefined}
   */
  this.extent = undefined;

  /**
   * @protected
   * @type {number}
   */
  this.extentRevision = -1;

  /**
   * @protected
   * @type {Object.<string, ol.geom.Geometry>}
   */
  this.simplifiedGeometryCache = {};

  /**
   * @protected
   * @type {number}
   */
  this.simplifiedGeometryMaxMinSquaredTolerance = 0;

  /**
   * @protected
   * @type {number}
   */
  this.simplifiedGeometryRevision = 0;

};
goog.inherits(ol.geom.Geometry, ol.Observable);


/**
 * @function
 * @return {ol.geom.Geometry} Clone.
 */
ol.geom.Geometry.prototype.clone = goog.abstractMethod;


/**
 * @param {number} x X.
 * @param {number} y Y.
 * @param {ol.Coordinate} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @return {number} Minimum squared distance.
 */
ol.geom.Geometry.prototype.closestPointXY = goog.abstractMethod;


/**
 * @param {ol.Coordinate} point Point.
 * @param {ol.Coordinate=} opt_closestPoint Closest point.
 * @return {ol.Coordinate} Closest point.
 * @todo api
 */
ol.geom.Geometry.prototype.getClosestPoint = function(point, opt_closestPoint) {
  var closestPoint = goog.isDef(opt_closestPoint) ?
      opt_closestPoint : [NaN, NaN];
  this.closestPointXY(point[0], point[1], closestPoint, Infinity);
  return closestPoint;
};


/**
 * @param {ol.Coordinate} coordinate Coordinate.
 * @return {boolean} Contains coordinate.
 */
ol.geom.Geometry.prototype.containsCoordinate = function(coordinate) {
  return this.containsXY(coordinate[0], coordinate[1]);
};


/**
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
ol.geom.Geometry.prototype.containsXY = goog.functions.FALSE;


/**
 * Get the extent of the geometry.
 * @function
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} extent Extent.
 * @todo api
 */
ol.geom.Geometry.prototype.getExtent = goog.abstractMethod;


/**
 * @function
 * @param {number} squaredTolerance Squared tolerance.
 * @return {ol.geom.Geometry} Simplified geometry.
 */
ol.geom.Geometry.prototype.getSimplifiedGeometry = goog.abstractMethod;


/**
 * @function
 * @return {ol.geom.GeometryType} Geometry type.
 */
ol.geom.Geometry.prototype.getType = goog.abstractMethod;


/**
 * Apply a transform function to the geometry.  Modifies the geometry in place.
 * @function
 * @param {ol.TransformFunction} transformFn Transform.
 * @todo api
 */
ol.geom.Geometry.prototype.applyTransform = goog.abstractMethod;


/**
 * Transform a geometry from one coordinate reference system to another.
 * Modifies the geometry in place.
 *
 * @param {ol.proj.ProjectionLike} source The current projection.  Can be a
 *     string identifier or a {@link ol.proj.Projection} object.
 * @param {ol.proj.ProjectionLike} destination The desired projection.  Can be a
 *     string identifier or a {@link ol.proj.Projection} object.
 * @return {ol.geom.Geometry} This geometry.  Note that original geometry is
 *     modified in place.
 * @todo api
 */
ol.geom.Geometry.prototype.transform = function(source, destination) {
  this.applyTransform(ol.proj.getTransform(source, destination));
  return this;
};


/**
 * Array representation of a point. Example: `[16, 48]`.
 * @typedef {ol.Coordinate}
 * @todo api
 */
ol.geom.RawPoint;


/**
 * Array representation of a linestring.
 * @typedef {Array.<ol.Coordinate>}
 * @todo api
 */
ol.geom.RawLineString;


/**
 * Array representation of a linear ring.
 * @typedef {Array.<ol.Coordinate>}
 * @todo api
 */
ol.geom.RawLinearRing;


/**
 * Array representation of a polygon.
 * @typedef {Array.<ol.geom.RawLinearRing>}
 * @todo api
 */
ol.geom.RawPolygon;


/**
 * Array representation of a multipoint.
 * @typedef {Array.<ol.geom.RawPoint>}
 * @todo api
 */
ol.geom.RawMultiPoint;


/**
 * Array representation of a multilinestring.
 * @typedef {Array.<ol.geom.RawLineString>}
 * @todo api
 */
ol.geom.RawMultiLineString;


/**
 * Array representation of a multipolygon.
 * @typedef {Array.<ol.geom.RawPolygon>}
 * @todo api
 */
ol.geom.RawMultiPolygon;

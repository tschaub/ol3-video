goog.provide('ol.IView');

goog.require('ol.IView2D');
goog.require('ol.IView3D');



/**
 * Interface for views.
 * @interface
 * @extends {goog.events.Listenable}
 */
ol.IView = function() {
};


/**
 * @return {ol.IView2D} View2D.
 */
ol.IView.prototype.getView2D = function() {
};


/**
 * @return {ol.IView3D} View3D.
 */
ol.IView.prototype.getView3D = function() {
};


/**
 * @return {boolean} Is defined.
 */
ol.IView.prototype.isDef = function() {
};

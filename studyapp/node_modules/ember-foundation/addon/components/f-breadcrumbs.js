import Ember from 'ember';
import FComponent from './f-component';
import layout from '../templates/components/f-breadcrumbs';

export default FComponent.extend({
  applicationController: null,

  breadCrumbs: Ember.computed(
    'controllers.@each.breadCrumbName',
    'pathNames.[]',
    function () {
      var breadCrumbs = Ember.A();
      var controllers = Ember.get(this, 'controllers');
      var defaultPaths = Ember.get(this, 'pathNames');

      controllers.forEach((controller, index) => {
        var crumbName = controller.get('breadCrumbName');

        if (crumbName) {
          return breadCrumbs.addObject({
            isCurrent: false,
            name: crumbName,
            path: defaultPaths[index]
          });
        }
      });

      if (breadCrumbs.length > 0) {
        breadCrumbs[breadCrumbs.length - 1].isCurrent = true;
      }

      return breadCrumbs;
    }
  ),

  classNames: ['breadcrumbs'],

  controllers: Ember.computed('handlerInfos.[]', function () {
    return Ember.get(this, 'handlerInfos').map(handlerInfo => {
      return Ember.get(handlerInfo, 'handler.controller');
    });
  }),

  handlerInfos: Ember.computed('applicationController.currentPath', function () {
    return Ember.get(this, 'router.router.currentHandlerInfos');
  }),

  layout,

  tagName: 'ul',

  pathNames: Ember.computed('handlerInfos.[]', function () {
    return Ember.get(this, 'handlerInfos').map(handlerInfo => {
      return Ember.get(handlerInfo, 'name');
    });
  }),

  router: null
});

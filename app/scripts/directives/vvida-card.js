angular.module('vvida.directives')
  .directive('vvidaCard', function() {
    return {
      restrict: 'EA',
      scope: {
        event: '=events'
      },
      replace: true,
      link: function(scope) {
        scope.timeLeft = function(startTime) {
          return moment(new Date(startTime)).from(new Date());
        };
      },
      template: '<md-card back-img="{{event.Images[0].img_url}}" >' +
        '<md-card-title-event class="overlay card-elements">' +
        '<md-card-title-text class="layout-align-end-start layout-column">' +
        '<span ui-sref="viewEvent({id: event.id})" '+
        'class="md-subheadline name visited ng-binding' +
        'href="/events/33">{{event.name}}</span>' +
        '<span class="md-subhead category event-venue">' +
        '<i class="fa fa-map-marker brand-colour"></i>' +
        '<span class="ng-binding">{{event.location}} , {{event.venue}}'+
        '</span>' +
        '</span><span class="md-subhead category event-description'+
        'ng-binding">{{event.description}}</span>' +
        '<span class="md-subhead category event-time-left">' +
        '<i class="fa fa-clock-o brand-colour"></i>' +
        '<span class="ng-binding">{{timeLeft(event.start_time)}}</span>'+
        '</span>' +
        '</md-card-title-text>' +
        '</md-card-title-event></md-card>' +
        '</md-card>'
    };
  });

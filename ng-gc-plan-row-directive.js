/**
 * @license ng-gc-plan-row-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-plan-row-directive.git
 * License: MIT
 */
(function(){
'use strict';

angular.module('plan-row-template.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('plan-row-template.html',
    '<div class="payments__list payments__list--seperate"><a class="payments__list__item payments__list--seperate__item payments__list__item--link table payments__list--seperate__item--{{ plan.status }}" ng-href="{{ url }}"><div class="table__cell"><div class="u-pull-start payments__list__item__icon" ng-show="isAuthorization"><i ng-hide="plan.currency === \'EUR\'" class="icon-direct-debit"></i> <i ng-show="plan.currency === \'EUR\'" class="icon-sepa"></i></div><div class="u-pull-start"><h5 class="payments__list__item__name">{{ plan.name || plan.description || plan.id }}</h5><p class="payments__list__item__date"><span class="payments__list__item__date__date">{{ plan.created_at | date }}</span> <span ng-show="plan.merchant_name"><i class="ss-user payments__list__item__date__customer-icon"></i> {{ plan.merchant_name | capitalizeEach }}</span></p></div><div class="u-pull-end payments__list__item__meta"><div class="u-pull-end u-text-right" ng-hide="plan.is_blank_preauth"><div class="payments__list__item__meta__amount u-text-h1"><span ng-show="plan.max_amount">up to</span> {{ plan.display_next_amount || plan.amount || plan.max_amount | currency:(plan.currency | currencySymbol ) }}</div><div><div ng-show="plan.recurring"><i class="icon-recurring-plan payments__list__item__meta__icon"></i> <span gc-intervals="plan.interval_unit" class="payments__list__item__date" count="plan.interval_length"></span></div><div ng-hide="plan.recurring"><span class="payments__list__item__date">One off</span></div></div></div></div></div></a></div>');
}]);

'use strict';

angular.module('gc.planRow', [
  'gc.intervals',
  'ngGcCapitalize',
  'ngGcCapitalizeEach',
  'ngGcCurrencySymbolFilter',
  'plan-row-template.html'
])
.directive('planRow', [
  function planRowDirective() {

    return {
      restrict: 'E',
      templateUrl: 'plan-row-template.html',
      scope: {
        plan: '=',
        isAuthorization: '@',
        url: '@'
      },
      replace: true
    };

  }
]);
})();
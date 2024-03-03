Feature: Amazon Test Suite

    Testing multiple scenarios on Amazon webpage with Cucumber

    Scenario: Adding an item to a Cart.
    Given I open Amazon webpage and choose a language
    When I search for some products.
    And I add all of them to a cart.
    Then should be added to the cart.


Feature: Start Timer

  Background:
    Given I go to the e.ggtimer homepage

  Scenario Outline: Input timer values and GO!
    When I enter "<time>" in the timer input field
    And I click "GO!"
    Then I see the page URL containing "<time>"
    And the timer counts down one second at a time from "<time>"
    Examples:
    | time         |
    | 25 seconds   |
    | 25 sec       |
    | 25 s         |
    | @#$!!%^*     |
    | 3 kilometers |
    | twenty       |
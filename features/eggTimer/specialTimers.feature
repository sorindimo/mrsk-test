Feature: Start special timer

  Background:
    Given I go to the e.ggtimer homepage

  Scenario Outline: Special timer values
    When I enter "<time>" in the timer input field
    And I click "GO!"
    Then I see the page URL containing "<time>"
    Examples:
      | time       |
      | pomodoro   |
      | morning    |
      | brushteeth |
      | tabata     |
Feature: Options (beta)

  Background:
    Given I go to the e.ggtimer homepage

  Scenario: Open the Options and change the default settings
    When I click "Options (beta)"
    Then I "see" the options modal
    And the options checked: "Beep,Full,On"
    When I check "Ring"
    When I check "Half"
    When I check "Off"
    And I Apply
    Then I "do not see" the options modal
    When I click "Options (beta)"
    Then I "see" the options modal
    And the options checked: "Ring,Half,Off"
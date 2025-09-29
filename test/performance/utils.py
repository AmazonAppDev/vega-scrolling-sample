
# Copyright (c) 2024 Amazon.com, Inc. or its affiliates.  All rights reserved.
# PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.

import logging
from typing import Any, Dict, Optional, Union
from enum import Enum
import time
 
supportAppiumOptions: bool = True
try:
    from appium.webdriver.webdriver import AppiumOptions
except ImportError:
    supportAppiumOptions = False
 
 
from appium import webdriver
 
# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput

class KeyEvents(Enum):
    LEFT = "105"
    RIGHT = "106"
    UP = "103"
    DOWN = "108"
    SELECT = "96"
    BACK = "158"
    HOMEPAGE = "170"


def press_key(driver, key_event: KeyEvents, *, holdDuration:int = 0, delay:float = 0.5, repetitions:int=1) -> None:
    for i in range(repetitions):
        driver.execute_script( "jsonrpc: injectInputKeyEvent", [{"inputKeyEvent": key_event.value, "holdDuration": holdDuration}])
        time.sleep(delay)
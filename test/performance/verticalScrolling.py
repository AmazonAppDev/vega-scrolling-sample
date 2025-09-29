# Copyright (c) 2024 Amazon.com, Inc. or its affiliates.  All rights reserved.
# PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.

import logging
from typing import Any, Dict, Optional, Union
from enum import Enum
import time
from utils import press_key, KeyEvents
 
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
 
appium_url: str = "http://127.0.0.1"
options: Optional[Union[Dict[str, Any], AppiumOptions]] = None
logger = logging.getLogger(__name__)

# Please do not change the name of the class
class TestRunner:
        
    def __init__(self, device_serial_number: str, port: int):
        self.__driver: Optional[webdriver.webdriver.WebDriver] = None
        _capabilities: Dict[str, Any] = {
            "platformName": "Kepler",
            "appium:automationName": "automation-toolkit/JSON-RPC",
            "kepler:device": f"vda://{device_serial_number}",
            "kepler:jsonRPCPort": 8383,
            "newCommandTimeout": 500,
            "appium:deviceName": device_serial_number,
        }
        self.appium_url = f"{appium_url}:{port}"

        if supportAppiumOptions:
            self.__driver = webdriver.Remote(
                self.appium_url, 
                options=AppiumOptions().load_capabilities(_capabilities)
            )
        else:
            self.__driver = webdriver.Remote(self.appium_url, _capabilities)
    
    def prep(self) -> None:
        ...
 
    def run(self) -> None:
        press_key(self.__driver, KeyEvents.DOWN, repetitions= 8)
        press_key(self.__driver, KeyEvents.UP, repetitions= 6)
        press_key(self.__driver, KeyEvents.DOWN, holdDuration=5000, delay=1)
        press_key(self.__driver, KeyEvents.UP, holdDuration=5000, delay=1)
        ...


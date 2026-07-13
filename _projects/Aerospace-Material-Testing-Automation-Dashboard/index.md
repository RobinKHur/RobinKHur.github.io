---
layout: post
title: Aerospace Material Testing Automation Dashboard
category: Software
description: Built a desktop automation app that integrates dual Alicat mass-flow controllers and a high-accuracy digital THProbe into a closed-loop humidity chamber for advanced aerospace materials testing. Dynamically regulates dry/humidified gas mixing via serial communication, holds steady-state humidity during long-duration test cycles without manual intervention, charts live conditions in real-time, and logs audit-grade telemetry to CSV — supporting research workflows tied to NASA, Lockheed Martin, and the F-35 Lightning II program.
skills:
  - Industrial instrument integration
  - Serial communication & device control
  - Closed-loop PID control
  - Real-time data acquisition
  - CSV telemetry logging
  - Environmental chamber automation
  - Aerospace testing workflows (NASA, Lockheed, F-35)
main-image: /tbd.png
---

🚀 **Project Overview: Aerospace Material Testing Automation Dashboard**

This project is a custom Windows desktop automation application designed to modernize environmental testing setups for advanced materials research. The software integrates an industrial digital temperature/humidity probe with high-precision gas mass flow controllers to create a fully automated, closed-loop environmental testing chamber. By continuously monitoring live data and utilizing smart feedback loops, it automatically maintains exact, steady-state humidity levels over extended testing cycles without human intervention.

## What Is It?

A turnkey, software-driven environmental testing instrument. Researchers set a target humidity value, and the application manages the underlying hardware micro-adjustments while plotting live chamber conditions on screen and writing audit-grade telemetry to disk.

## Core Instrumentation Used

The system relies on high-grade, laboratory-standard instruments to achieve high-accuracy data and tight environmental tolerances:

- **Alicat Mass Flow Controllers (MFCs)** — Dual independent Alicat mass-flow controllers regulate the precise mixing of dry and humidified gas streams. The software controls these instruments via serial communication to make dynamic, micro-liter adjustments on the fly.
- **High-Accuracy THProbe** — Interfaces with a digital Temperature & Humidity probe to read the real-time atmospheric conditions of the material chamber.
- **Water Bubbler System** — Directs flow from the primary Alicat controller through a physical water volume to humidify the air stream prior to delivery.

## Who It Serves & How It Aids Research

This system was built to support rigorous materials testing pipelines, including research workflows tied to high-stakes aerospace and defense initiatives like NASA, Lockheed Martin, and the F-35 Lightning II program.

- **Why precise humidity control matters** — High-performance aerospace materials (radar-absorbent coatings, advanced carbon-fiber composites, next-generation cockpit electronics) must be validated against strict atmospheric conditions. Moisture absorption can compromise structural integrity, alter electrical properties, or accelerate corrosion in extreme flight environments.
- **Eliminating the manual bottleneck** — The previous setup required researchers to manually adjust the physical gas valves on the Alicat devices and constantly monitor readings. Because gas transit through the lines introduces a physical time delay, manual tuning caused unstable environmental spikes and inconsistent data.
- **The modern solution** — This software transforms the equipment into a turnkey research asset. Scientists simply set a target humidity, and the app manages the micro-adjustments perfectly. It charts the environment in real-time, automatically logs precise telemetry to a CSV spreadsheet for formal documentation, and features built-in safety boundaries to protect sensitive, high-value aerospace testing samples.

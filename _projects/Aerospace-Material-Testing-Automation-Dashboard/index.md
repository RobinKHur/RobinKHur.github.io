---
layout: post
title: Aerospace Material Testing Automation Dashboard
category: Software
description: Developed as a research assistant in the UVA Department of Materials Science and Engineering, this Python-driven automation system integrates dual Alicat mass-flow controllers and a high-accuracy Monarch THProbe into a closed-loop environmental chamber for aerospace materials testing. A custom PID control loop dynamically balances dry and humidified N₂ gas streams to maintain relative humidity within ±2% over 20+ hours of continuous operation, eliminating the manual tuning bottleneck that previously caused unstable environmental spikes. Supports environmental cracking test workflows for high-strength aerospace aluminum alloys tied to NASA, Lockheed Martin, and the F-35 Lightning II program.
skills:
  - Python
  - Closed-loop PID control
  - Serial communication & device control
  - Real-time data acquisition
  - Industrial instrument integration
  - Aerospace testing (NASA, Lockheed Martin, F-35)
main-image: ""
---

🚀 **Project Overview: Aerospace Material Testing Automation Dashboard**

Built during my research assistantship in the UVA Department of Materials Science and Engineering, this custom Python desktop application modernizes environmental testing for advanced aerospace materials. The software integrates an industrial Monarch digital temperature/humidity probe with dual Alicat mass-flow controllers to create a fully automated, closed-loop environmental chamber. A PID control algorithm continuously monitors live sensor data and issues micro-adjustments to the gas flow mix, holding relative humidity within ±2% over 20+ hours of continuous testing without human intervention.

## What Is It?

A turnkey, software-driven environmental testing instrument. Researchers set a target humidity value, and the application manages the underlying hardware adjustments while plotting live chamber conditions on screen and writing audit-grade telemetry to disk.

## Core Instrumentation Used

The system relies on high-grade, laboratory-standard instruments to achieve tight environmental tolerances:

- **Alicat Mass Flow Controllers (MFCs)** — Dual independent Alicat controllers regulate the precise mixing of dry and humidified N₂ gas streams. The software controls these instruments via serial communication, making dynamic micro-liter adjustments on the fly.
- **Monarch THProbe** — A high-accuracy digital Temperature & Humidity probe that reads real-time atmospheric conditions inside the material chamber.
- **Water Bubbler System** — Directs flow from the primary Alicat controller through a physical water volume to humidify the air stream prior to delivery.

## Who It Serves & How It Aids Research

This system directly supports environmental cracking test workflows for high-strength aerospace aluminum alloys, serving research pipelines tied to NASA, Lockheed Martin, and the F-35 Lightning II program.

- **Why precise humidity control matters** — High-performance aerospace materials (radar-absorbent coatings, advanced carbon-fiber composites, next-generation cockpit electronics) must be validated against strict atmospheric conditions. Moisture absorption can compromise structural integrity, alter electrical properties, or accelerate corrosion in extreme flight environments.
- **Eliminating the manual bottleneck** — The previous workflow required researchers to manually adjust physical gas valves on the Alicat devices and constantly monitor readings. Because gas transit through the lines introduces a physical time delay, manual tuning caused unstable environmental spikes and inconsistent data.
- **The modern solution** — This software transforms the equipment into a turnkey research asset. Scientists set a target humidity, and the app manages the micro-adjustments autonomously. It charts the environment in real-time, automatically logs precise telemetry to CSV for formal documentation, and features built-in safety boundaries to protect sensitive, high-value aerospace testing samples.

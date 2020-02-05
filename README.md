# PolyPie
 ACTAM Project 2019/2020 developed by Mattia Lercari, Alessio Lampis and Antonio Pappa.

 Here the video demonstration: 
 Here the live demo: https://alessiolampis.github.io/PolyPie/

 ## Intro

**PolyPie** is a simple web app that lets you easily set up and play polyrhythms and polymeters,
while visualizing them on sliced circles, which we call **Pies**. The Pies rotate in sync with 
the sounds, and they are designed to help you understand what it is exactly that you're hearing.

 ## Polyrhythms
In the Polyrhythms section, you are presented with two number boxes which you can fill in, labeled 
*Guest* and *Host*. These numbers define the subdivisions of the two rhythms you're going to hear playing at the same time once you press "Start". You can think of them in this way: you have a main rhythm or pulse (the "host") on top of which a different "guest" rhythm is layered, creating a new and interesting pattern.
The guest and host patterns have the same duration and different subdivisions; the corresponding Pies (outer and inner, respectively) show the same subdivision, with the first beat highlighted, and rotate a full 360° in the same amount of time, but they are divided in slices of different angles, so they play at different rates. After a full loop, anyways, the two pies catch up, and they play the first beat in unison.

## Polymeters
In the Polymeter section you can see two pairs of inputs (labeled "Meter 1" and "Meter 2") that you can modify with the "+" and "-" buttons beside each one. These pairs define the time signatures of the two meters that are going to be played simultaneously.
Here the Pies will not play a sound on every step, but they will play only once every turn (on the "1" of the meter). The duration of a single turn is that of one measure of the corresponding meter.
### Shifted Pie
There's an additional feature in this section: you can add one more Pie by toggling the "shifted pie" button. This pie will have at first the same subdivision of Meter 1 and will move and play along with it. As the name suggests, it's possible to shift the angular position of this Pie with the "+" an "-" buttons that appear under the "shift amount" label. Moreover, by toggling the "shift subdivision" button, the subdivision of the Pie becomes the one of Meter 2.


# Simple Baduk

A vanilla javascript version of the ancient game of [go](https://en.wikipedia.org/wiki/Go_(game)).

*Requires a browser with HTML 5 (for the canvas element).*

Play a game [here](link). Learn the rules [here](https://online-go.com/learn-to-play-go).

This is a very simple implementation that can be used as a fast and lightweight demonstration board, or for a game between two human players at the same machine, as it would be in real life - the only advantage is that you don't have to count the prisoners, and you don't have to remove dead stones.

## The algorithm

![Image of Flowchart](https://github.com/iansedano/Simple_Baduk/blob/master/baduk_flowchart.png)

I used a flood-fill type algorithm that uses queues: for the whole board, for the group, and for the cardinal points of each group. The tricky part is making sure the queues are updated correctly. During this process the algorithm counts the number of "liberties" that the group has, and thus determines if the group is alive or dead.

It rebuilds the groups every time the user clicks the spot they wish to place the next stone. If the move is suicide. for example, it is determined by building the groups, and prevents the user from playing that move.

## License

[MIT](https://choosealicense.com/licenses/mit/)
export default function ToEulerAngles([x, y, z, w]) {
    let t0 = +2.0 * (w * x + y * z)
    let t1 = +1.0 - 2.0 * (x * x + y * y)
    let roll_x = Math.atan2(t0, t1)

    let t2 = +2.0 * (w * y - z * x)
    t2 = t2 > +1.0 ? +1.0 : t2
    t2 = t2 < -1.0 ? -1.0 : t2
    let pitch_y = Math.asin(t2)

    let t3 = +2.0 * (w * z + x * y)
    let t4 = +1.0 - 2.0 * (y * y + z * z)
    let yaw_z = Math.atan2(t3, t4)

    return ([roll_x, pitch_y, yaw_z].map(i => i * 180 / Math.PI))
}
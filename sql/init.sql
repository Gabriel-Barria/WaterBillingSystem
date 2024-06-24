SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clientes_db`
--
-- CREATE DATABASE clientes_db; -- Eliminar esta línea
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boletas`
--

CREATE TABLE `boletas` (
  `idboleta` bigint(20) UNSIGNED NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `idlectura` bigint(20) UNSIGNED NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `boletas`
--

INSERT INTO `boletas` (`idboleta`, `monto`, `idlectura`, `fechahora`) VALUES
(5, '123286.00', 1, '2024-06-10 20:08:49'),
(6, '5931128.60', 2, '2024-06-10 20:14:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `rut` varchar(10) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombres`, `apellidos`, `rut`, `direccion`, `email`, `telefono`) VALUES
(7, 'Gabriel', 'Barria Zuñiga', '19175724-6', 'Pasaje Bauche 309', 'ibarria302@gmail.com', '973550328'),
(10, 'Gabriel Ignacio', 'Barria Zuñiga', '19175724-6', 'Pasaje Bauche 309', 'ibarria302@gmail.com', '973550328'),
(11, 'Gabriel Ignacio', 'Barria Zuñiga', '19175724-6', 'Pasaje Bauche 309', 'ibarria302@gmail.com', '973550328'),
(12, 'Gabriel Ignacio', 'Barria Zuñiga', '99520820-2', 'Pasaje Bauche 309', 'ibarria302@gmail.com', '973550328'),
(13, 'Nancy', 'Zuñiga', '99520820-2', 'Pasaje Bauche 309', 'jgbarriav@gmail.com', '988584908');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lecturas`
--

CREATE TABLE `lecturas` (
  `idlectura` bigint(20) UNSIGNED NOT NULL,
  `idcliente` int(11) NOT NULL,
  `lectura` int(11) NOT NULL,
  `periodo` varchar(7) NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `fotoMedidor` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lecturas`
--

INSERT INTO `lecturas` (`idlectura`, `idcliente`, `lectura`, `periodo`, `fechahora`, `fotoMedidor`) VALUES
(1, 7, 100, '2024-06', '2024-06-10 19:46:21', ''),
(2, 13, 5010, '2024-06', '2024-06-10 20:11:41', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boletas`
--
ALTER TABLE `boletas`
  ADD PRIMARY KEY (`idboleta`),
  ADD UNIQUE KEY `idboleta` (`idboleta`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lecturas`
--
ALTER TABLE `lecturas`
  ADD PRIMARY KEY (`idcliente`,`periodo`),
  ADD UNIQUE KEY `idlectura` (`idlectura`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boletas`
--
ALTER TABLE `boletas`
  MODIFY `idboleta` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `lecturas`
--
ALTER TABLE `lecturas`
  MODIFY `idlectura` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

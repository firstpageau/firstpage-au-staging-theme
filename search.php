<?php
// Blog Home
$context = Timber::get_context();

$context['posts'] = new Timber\PostQuery();
// $context['sumome']      = true;
// $context['floatform']   = true;
$context['categories'] = Timber::get_terms('category', array('parent' => 0));


$templates = array( pll_current_language() . '-' . 'blog.twig' );
Timber::render( $templates, $context );
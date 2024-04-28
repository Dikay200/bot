/*
 * ZMap Copyright 2013 Regents of the University of Michigan
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

#include "random.h"
#include <stdlib.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <assert.h>

#define RANDSRC "/dev/urandom"

int random_bytes(void *dst, size_t n)
{
	FILE *f = fopen(RANDSRC, "rb");
	assert(f);
	size_t r = fread(dst, n, 1, f);
	fclose(f);
	if (r < 1) {
		return 0;
	}
	return 1;
}
